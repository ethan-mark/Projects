from components import api_handler, database_connector,utilities,JWT_token

def main():
    api = api_handler.Api_third_party_site()
    results = api.get_extension_summary()
    company = api_handler.Company(results)
    connection, cursor =database_connector.initialize_database_connection()
    prepared_insert_statement = """
    INSERT INTO companies (
                name,email,phone_number,inbound_total,outbound_total
            ) VALUES (%s,%s,%s,%s,%s)
            """
    insert_list = []
    for key,value in company.get_employee_data().items():
        insert_list.append((
            value.get_data()['name'],
            value.get_data()['email'],
            value.get_data()['phone_number'],
            value.get_data()['inbound_total'],
            value.get_data()['outbound_total']
        ))
    cursor.executemany(prepared_insert_statement,insert_list)
    connection.commit()
    connection.close()

if __name__ == "__main__":
    main()