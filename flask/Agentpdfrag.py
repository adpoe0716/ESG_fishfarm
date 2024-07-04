import chromadb
from llama_index.llms.openai import OpenAI
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import SummaryIndex
from llama_index.core import VectorStoreIndex
from llama_index.core import Settings
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.agent.openai import OpenAIAgent
from llama_index.embeddings.openai import OpenAIEmbedding
import os
CHROMA_PATH = "chroma"

directory_path = './data'
Titles = os.listdir(directory_path)



Settings.llm = OpenAI(model="gpt-4",temperature=0.1)
Settings.embed_model = OpenAIEmbedding()

db2 = chromadb.PersistentClient()
chroma_collection = db2.get_collection("quickstart1")
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
index = VectorStoreIndex.from_vector_store(
    vector_store,
)

import pickle

nodes_file_path = "./title_data/title_data.pkl"

with open(nodes_file_path, "rb") as nodes_file:
    loaded_nodes = pickle.load(nodes_file)

summary_index = SummaryIndex(loaded_nodes)

vector_query_engine = index.as_query_engine()
summary_query_engine = summary_index.as_query_engine()


query_engine_tools = [
    QueryEngineTool(
       query_engine=vector_query_engine,
            metadata=ToolMetadata(
                name="vector_tool",
                description=(
                    "Useful for questions related to specific aspects of"
                    f"  (e.g. the history, teams "
                    "and performance in EU, or more)."
                ),
            ),
        ),     
    QueryEngineTool(
        query_engine=summary_query_engine,
            metadata=ToolMetadata(
                name="summary_tool",
                description=(
                    "Useful for any requests that require a holistic summary"
                    f" of EVERYTHING about . For questions about"
                    " more specific sections, please use the vector_tool."
                ),
            ),
        ),        
]    
function_llm = OpenAI(model="gpt-4")
agent = OpenAIAgent.from_tools(
        query_engine_tools,
        llm=function_llm,
        verbose=True,
        system_prompt=f"""\
You are a specialized agent designed to answer queries about .
You must ALWAYS use at least one of the tools provided when answering a question; do NOT rely on prior knowledge.\
""",
    )

def agentpdfrag():
    query_engine = index.as_query_engine(response_mode="tree_summarize",agent=agent)
    agent_tool = QueryEngineTool.from_defaults(
        query_engine=query_engine,
        name="agent_tool",
        description=(
            f""
        ),
    )
    return agent_tool



