import requests, time

with open("query_result.csv", "r") as f:
    i = 0
    for domain in f:
        d = domain.strip('\n')
        print(d)
        requests.get("http://localhost:8888/"+d)
        i += 1
        if i % 20:
            time.sleep(5)
