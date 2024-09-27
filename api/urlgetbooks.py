import requests


def get_author_key(author_name):
    url = f"https://openlibrary.org/search.json?author={author_name}&fields=key,title,author_name,editions&limit=10"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data['numFound'] > 0:
            key = data['docs'][0]['key']
            return key
        else:
            return None
    else:
        return None


def get_subjects(key):
    work_url = f"https://openlibrary.org{key}.json"
    response = requests.get(work_url)
    if response.status_code == 200:
        data = response.json()
        if 'subjects' in data:
            return data['subjects']
        else:
            return None
    else:
        return None


if __name__ == '__main__':
    author_name = input("Введите имя и фамилию автора: ")
    author_key = get_author_key(author_name)

    if author_key:
        print(f"Ключ: {author_name}: {author_key}")
        subjects = get_subjects(author_key)

        if subjects:
            print(f"Список тем для {author_key}:")
            for subject in subjects:
                print(f"{subject}")
        else:
            print(f"Нет.")
    else:
        print(f"Не удалось найти {author_name}.")
