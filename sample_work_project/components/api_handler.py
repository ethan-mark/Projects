from components import JWT_token
from dotenv import load_dotenv
import os
import requests
import urllib.parse
from datetime import datetime, timedelta

class Person():
    def __init__(self,user_name, data):
        self._user_name = user_name
        self._data = data

    def get_user_name(self):
        return self._user_name

    def get_data(self):
        return self._data

class Company():
    def __init__(self,results):
        self._records = results
        self._employee_data = {}
        self.populate_employee_data()
        self._data_keys = list(results[0].keys())

    def populate_employee_data(self):
        i = 0
        while i < len(self._records):
            email = self._records[i].get("Email")
            if email == "":
                i+=1
                continue
            self._employee_data[email.lower()] = Person(email.lower(),self._records[i])
            i+=1

    def get_person_data(self,arg_email:str):
        for email,person_object in self._employee_data.items():
            if email == arg_email.lower():
                for key,value in person_object.get_data().items():
                    print(f"{key}: {value}")

    def get_employee_data(self):
        return self._employee_data

    def get_data_keys(self):
        return self._data_keys

class Api_third_party_site():
    def __init__(self):
        load_dotenv()
        self._jwt_token = JWT_token.v1_token()
        self._api_key = os.getenv('third_party_site_CLIENTID')
        self._secret = os.getenv('third_party_site_SECRET')

    def print_keys(self):
        parameters = {
            'third_party_site-apikey':self._api_key,
            'Authorization': f"Bearer {self._jwt_token}"
        }
        print(f"""
jwt_token: {self._jwt_token}
api_key: {self._api_key}
""")

    def get_extension_summary(self):
        yesterday = datetime.now() - timedelta(days=1)

        # Yesterday at 5 AM
        yesterday_at_5am = yesterday.replace(hour=5, minute=0, second=0, microsecond=0)

        # Yesterday at 11:59 PM
        yesterday_at_1159pm = yesterday.replace(hour=23, minute=59, second=59, microsecond=0)

        # Format the output
        formatted_5am = yesterday_at_5am.strftime('%Y-%m-%d %H:%M:%S')
        formatted_1159pm = yesterday_at_1159pm.strftime('%Y-%m-%d %H:%M:%S')
        start_time = urllib.parse.quote_plus(formatted_5am)
        end_time = urllib.parse.quote_plus(formatted_1159pm)
        url = f"https://api.third_party_site.com/analytics/work/v2/extsum?pbxId=ALLID&startTime={start_time}&endTime={end_time}&timeZone=America%2FChicago"
        headers = {
            "accept": "application/json",
            "third_party_site-apikey": self._api_key,
            "authorization":f"Bearer {self._jwt_token}"
        }
        response = requests.get(url, headers=headers)
        return response.json()




