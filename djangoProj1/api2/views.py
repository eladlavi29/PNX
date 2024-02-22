from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
import json # required for functions implementation
from django.http import JsonResponse # required for functions implementation
import psycopg2 as pg# required for running a query on the database

"""

def getAllQueryNames(json_file_path):
    try:
        with open(json_file_path, 'r') as file:
            data = json.load(file)
            query_names = [query['name'] for query in data]
            return JsonResponse({'query_names': query_names})
    except FileNotFoundError:
        return JsonResponse({'error': 'File not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)




from django.http import JsonResponse

def runQuery(query): # expects the query to be a string.
    try:
        connection = pg.connect(dbname="postgres", user="postgres", password="1234", host="localhost") # port?
        cursor = conn.cursor()
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        return JsonResponse({'results': results})
    except psycopg2.Error as e:
        return JsonResponse({'error': str(e)}, status=500)



from django.http import JsonResponse

def addQueryToServer(name, type, query, json_file_path): # Assumming the JSON file exists
    try:
        # Loading existing queries from the JSON file
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        # Checking if the query with the given name already exists
        for existing_query in data:
            if existing_query['name'] == name:
                return JsonResponse({'error': 'Query name already exists'}, status=400)

        # Adding the new query to the data
        new_query = {'name': name, 'type': type, 'query': query}
        data.append(new_query)

        # Writing the updated data back to the JSON file
        with open(json_file_path, 'w') as file:
            json.dump(data, file)

        return JsonResponse({'message': 'Query added successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def findQueryInServer(name, json_file_path):
    try:
        # Loading existing queries from the JSON file
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        # Searching for the query with the given name
        for query in data:
            if query['name'] == name:
                return JsonResponse({'query': query})

        # If the query is not found
        return JsonResponse({'error': 'Query not found'}, status=404)
    except FileNotFoundError:
        return JsonResponse({'error': 'JSON file not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=500)


def removeQueryFromServer(name, json_file_path):
    try:
        # Loading existing queries from the JSON file
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        # Searching for the query with the given name
        for query in data:
            if query['name'] == name:
                # Removing the query from the data
                data.remove(query)

                # Writing the updated data back to the JSON file
                with open(json_file_path, 'w') as file:
                    json.dump(data, file)

                return JsonResponse({'message': 'Query removed successfully'})

        # If the query is not found
        return JsonResponse({'error': 'Query not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def getQueriesOfType(query_type, json_file_path):
    try:
        # Loading existing queries from the JSON file
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        # Filterring queries of the requested type
        queries_of_type = [query for query in data if query.get('type') == query_type]

        return JsonResponse({'queries': queries_of_type})
    except FileNotFoundError:
        return JsonResponse({'error': 'JSON file not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=500)



def getTypes(json_file_path):
    try:
        # Loading existing queries from the JSON file
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        # Extracting unique types of queries
        query_types = set(query.get('type') for query in data)
        return JsonResponse({'query_types': list(query_types)})
    except FileNotFoundError:
        return JsonResponse({'error': 'JSON file not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=500)


### Check if a 'parameters' kwy-value can be added to the json file!!!
def getInputParams(query_name, queries):
    query = findQueryInServer(query_name, queries)
    parameters = query.get('parameters', [])
    return JsonResponse({'parameters': parameters})


"""


@api_view(['GET'])
def alohaworld(request):
    return Response({'message': 'AlohaWorld! (from El Serveritttooo...)'})

@api_view(['GET'])
def ahlan(request):
    return Response({'message': 'Ahlan Wasakalan! (from El Serveritttooo...)'})


from django.http import JsonResponse

def addQueryToServer(name, type, query, json_file_path): # Assumming the JSON file exists
    try:
        # Loading existing queries from the JSON file
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        # Checking if the query with the given name already exists
        for existing_query in data:
            if existing_query['name'] == name:
                return JsonResponse({'error': 'Query name already exists'}, status=400)

        # Adding the new query to the data
        new_query = {'name': name, 'type': type, 'query': query}
        data.append(new_query)

        # Writing the updated data back to the JSON file
        with open(json_file_path, 'w') as file:
            json.dump(data, file)

        return JsonResponse({'message': 'Query added successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

