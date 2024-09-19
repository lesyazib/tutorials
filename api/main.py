import requests

if __name__ == "__main__":
    req = requests.get("https://byabbe.se/on-this-day/5/10/events.json")
    print(req.status_code)
    print(req.content)
    print(data["events"][0])