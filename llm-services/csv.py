from fastapi import FastAPI
import psycopg2
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel
from typing import List

app = FastAPI (title="LLM", summary='nsjknskjs')

@app.get("/by_price")
def get_llm_by_price(price:int):
    query = ( "SELECT llm.name, llm.description FROM llm, tariff " 
              f"WHERE llm.id = tariff.llm_id AND tariff.price > {price};")

    with psycopg2.connect('postgres://postgres:olesya2004@localhost:5432/try') as conn:
        cur = conn.cursor()

        cur.execute(query)
        data = cur.fetchall()
    return data

class LlmItem(BaseModel):
    id: int
    name: str
    description: str = None

@app.post("/llm_info")
def add_new_llm_item (items: List[LlmItem]):
    with psycopg2.connect('postgres://postgres:olesya2004@localhost:5432/try') as conn:
        cur = conn.cursor()
        for item in items:
            query = f"INSERT INTO llm(id, name, description) VALUES (%s, %s, %s);"
            cur.execute(query, (item.id, item.name, item.description))
        return{"message":"added"}

@app.get("/search_llm")
def search_llm(
        price: int,
        keywords: str,
        availability: bool
):
    query = f"""
        SELECT llm.name, llm.description, tariff.price, availability.status FROM llm
        JOIN tariff ON llm.id = tariff.llm_id
        JOIN availability ON llm.id = availability.llm_id
        WHERE tariff.price <= {price}
          AND llm.description ILIKE '%{keywords}%'
          AND availability.status = {availability};
    """

    print(query)

    with psycopg2.connect('postgres://postgres:olesya2004@localhost:5432/try') as conn:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(query)
        data = cur.fetchall()
    return data
