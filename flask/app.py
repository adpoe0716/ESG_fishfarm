from flask import Flask,request, redirect, url_for , jsonify
from llama_index.agent.openai import OpenAIAssistantAgent
from Agentpdfrag import agentpdfrag
from sqlSearch import sqlSearch
from flask_cors import CORS
sql_tool = sqlSearch()

agent_tool = agentpdfrag()

agent = OpenAIAssistantAgent.from_new(
    name="carbon bot",
    instructions="You are a bot designed to answer questions about carbon emissions (unstructured and structured data)"
                 "Please answer in Traditional Chinese."
                 "To answer the relevant part of the question, use agent_tool.",
    tools=[sql_tool, agent_tool],
    verbose=True,
)

app = Flask(__name__)
CORS(app)
@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/weather")
def weather():
    import requests

    # 設定API的URL
    url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-656F7999-651B-4101-BFBC-24904282D2E9&format=JSON&locationName=%E9%9B%B2%E6%9E%97%E7%B8%A3"

    # 發送GET請求
    response = requests.get(url)

    # 檢查請求是否成功
    if response.status_code == 200:
        # 將回應的JSON內容轉換成字典
        data = response.json()
        
        # 檢查資料中的'success'欄位是否為'true'
        if data['success'] == 'true':
            return data
            # 取出第一個地點的天氣資訊（假設只有一個地點）
            location = data['records']['location'][0]
            
            # 取出天氣資訊
            weather_elements = {element['elementName']: element for element in location['weatherElement']}
            wx = weather_elements['Wx']['time']  # Wx(天氣現象)
            maxt = weather_elements['MaxT']['time']  # MaxT(最高溫度)
            mint = weather_elements['MinT']['time']  # MinT(最低溫度)
            pop = weather_elements['PoP']['time']  # PoP(降雨機率)
            print(weather_elements)
            # 顯示氣象預報格式
            print("天氣預報：")
            for i in range(len(wx)):
                start_time = wx[i]['startTime']
                end_time = wx[i]['endTime']
                wx_name = wx[i]['parameter']['parameterName']  # 天氣現象
                max_temp = float(maxt[i]['parameter']['parameterName'])  # 最高溫
                min_temp = float(mint[i]['parameter']['parameterName'])  # 最低溫
                rain_prob = int(pop[i]['parameter']['parameterName'])  # 降雨機率

                print(f"時間：{start_time} 至 {end_time}")
                print(f"天氣現象：{wx_name}")
                print(f"最高溫：{round(max_temp, 1)}°C")
                print(f"最低溫：{round(min_temp, 1)}°C")
                print(f"降雨機率：{rain_prob}%")
                print()
            
            # 打印顯示這是雲林縣的訊息
            print("這是雲林縣的天氣預報。")
        else:
            print("請求失敗或返回數據中'success'欄位不為'true'")
    else:
        print(f"請求失敗，狀態碼：{response.status_code}")

@app.route("/gpt", methods=['POST'])
def gpt():
    data = request.json
    message = data.get('message')
    response = agent.chat(message)
    print(str(response))
    print("-----------------")
    return jsonify({"ans": str(response)})

if __name__ == '__main__':
    app.run('0.0.0.0',debug=True)
