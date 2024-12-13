import json
if __name__ == "__main__":
    with open("/Find url/position_data.json", "r", encoding ='utf-8') as file:
        data = json.load(file)
        result= {}
        for item in data:
            url = item['external_url']
            domen = url.split('/')[2]

            result[domen] = result.get(domen, 0) + 1
        print(result)