import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

def initialize_database_connection():
    hostname = os.getenv('DB_HOSTNAME')
    port = os.getenv('DB_PORT')
    username = os.getenv('DB_USERNAME')
    password = os.getenv('DB_PASSWORD')
    database = os.getenv('DB_DATABASE')
    connection = mysql.connector.connect(host=hostname, user=username, passwd=password, db=database, port=port)
    cursor = connection.cursor(prepared=True)
    return connection,cursor
