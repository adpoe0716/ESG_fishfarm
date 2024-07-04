import chromadb
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
from llama_index.core import VectorStoreIndex,SimpleDirectoryReader
from llama_index.core import Settings
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.extractors import TitleExtractor
import shutil
import os

CHROMA_PATH = "chroma"

if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)
chroma_client =  chromadb.PersistentClient()
chroma_collction =  chroma_client.create_collection("quickstart1")
vector_store  = ChromaVectorStore(chroma_collection=chroma_collction)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
documents = SimpleDirectoryReader("data").load_data()

Settings.chunk_size = 512
index = VectorStoreIndex.from_documents(
    documents,transformations=[SentenceSplitter(chunk_size=512)],storage_context=storage_context
)

node_parser = SentenceSplitter(chunk_size=512)
extractor = TitleExtractor()
nodes = node_parser(documents)
nodes = extractor(nodes)

import pickle

folder_path = "./title_data"
if not os.path.exists(folder_path):
    os.makedirs(folder_path)

title_file_path = "./title_data/title_data.pkl"

with open(title_file_path, "wb") as title_file:
    pickle.dump(nodes, title_file)

print(f"已將 Nodes 資料儲存至 {title_file_path}，以供未來使用。")



