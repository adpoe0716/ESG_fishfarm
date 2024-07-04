from llama_index.llms.openai import OpenAI
from llama_index.core import SQLDatabase, ServiceContext
from sqlalchemy import create_engine 
from llama_index.core.query_engine import NLSQLTableQueryEngine
from llama_index.core.tools import BaseTool, QueryEngineTool

llm = OpenAI(temperature=0.1, model="gpt-4-turbo-preview")
service_context = ServiceContext.from_defaults(llm=llm)

def sqlSearch():
    # 創建連接字符串
    connection_string = "mysql+mysqlconnector://root:123456789@localhost:3306/fish_1"

    # 創建SQL Alchemy引擎
    engine = create_engine(connection_string)



    # 創建SQL數據庫對象
    sql_database = SQLDatabase(engine, include_tables=["carbon", "sensor"])

    sql_query_engine = NLSQLTableQueryEngine(
        sql_database=sql_database,
        tables=["carbon", "sensor"],
        verbose=True
    )

    sql_tool = QueryEngineTool.from_defaults(
        query_engine=sql_query_engine,
        name="sql_tool",
        description=(
            "Useful for translating a natural language query into a SQL query over"
            " a table containing: carbon and sensor, containing the day or time and value"
        ),
    )
    return sql_tool
    # response = sql_query_engine.query("carbon_day 2023-12-19的co2是多少")
    # print(response)

