import unittest
import main

class Test(unittest.TestCase):
    def test1(self):
        """Test to see what would happen if passing in an invalid email"""
        api = main.api_handler.Api_third_party_site()
        results = api.get_extension_summary()
        company = main.api_handler.Company(results)
        company.get_person_data("test@gmail.com")
        print(company.get_employee_data()) #  {user_name: Person() }

    def test2(self):
        """Test to see if the camel_to_snake_case method worked """
        api = main.api_handler.Api_third_party_site()
        results = api.get_extension_summary()
        company = main.api_handler.Company(results)
        for key in company.get_data_keys():
            print(main.utilities.camel_to_snake_case(key))

    def test3(self):
        """Test to see if we can build a summary of the outbound total calls made on the day """
        api = main.api_handler.Api_third_party_site()
        results = api.get_extension_summary()
        company = main.api_handler.Company(results)
        company_data = company.get_employee_data()

        outbound_map = {}
        for person_email, person_object in company_data.items():
            outbound_map[person_email] = person_object.get_data()['Department']
        for person_email, outbound_total in sorted(outbound_map.items(),key=lambda x:x[1],reverse=False):
            print(f"{person_email}: {outbound_total}")
    def test4(self):
        """Pull the total amount for the analytical fields for all Carrier Sales employees"""
        def convert_milli_to_minutes(map):
            divide_number = 60000
            for field, result in map.items():
                if "Time" in field:
                    map[field] = f"{int(result / divide_number)} mins"
        search_department = 'Carrier Sales'
        api = main.api_handler.Api_third_party_site()
        results = api.get_extension_summary()
        company = main.api_handler.Company(results)
        company_data = company.get_employee_data()
        total_map = {
"External_Inbound_Total":0,
"External_Inbound_Answered":0,
"External_Inbound_Abandoned":0,
"Percent_External_Inbound_Answered":0,
"External_Inbound_Missed":0,
"External_Outbound_Total":0,
"External_Outbound_Answered":0,
"Percent_External_Outbound_Answered":0,
"External_Outbound_Abandoned":0,
"Internal_Inbound_Total":0,
"Internal_Inbound_Answered":0,
"Internal_Inbound_Abandoned":0,
"Internal_Inbound_Missed":0,
"Internal_Outbound_Total":0,
"Internal_Outbound_Answered":0,
"Internal_Outbound_Abandoned":0,
"Inbound_Total":0,
"Inbound_Answered":0,
"Inbound_Abandoned":0,
"Inbound_Missed":0,
"Total_Calls_To_VM":0,
"Outbound_Total":0,
"Outbound_Answered":0,
"Outbound_Abandoned":0,
"Total_Answered":0,
"Total_Abandoned":0,
"Total_Missed":0,
"Total_Ring_Time":0,
"Total_Talk_Time":0,
"Total_Abandoned_Time":0,
"Total_Call_Time":0,
"Avg_Ring_Time":0,
"Avg_Talk_Time":0,
"Inbound_Talk_Time":0,
"Outbound_Talk_Time":0,
"Avg_Abandoned_Time":0
        }

        for person_email,person_object in company_data.items():
            if person_object.get_data()['Department'] == "Carrier Sales":
                for field, result in person_object.get_data().items():
                    print(field,result)
                    if field == "Percent_External_Outbound_Answered" or field == "Percent_External_Inbound_Answered":
                        continue
                    try:
                        total_map[field] += result
                    except:
                        pass
        print(f"Carrier Sales 1/15/25")
        total_map['Percent_External_Outbound_Answered'] = round(total_map['External_Outbound_Answered'] / total_map['External_Outbound_Total'],2)
        total_map['Percent_External_Inbound_Answered'] = round(total_map['External_Inbound_Answered'] / total_map['External_Inbound_Total'],2)
        convert_milli_to_minutes(total_map)
        for key,value in total_map.items():
            print(f"    {key}: {value}")

if __name__ == "__main__":
    unittest.main()