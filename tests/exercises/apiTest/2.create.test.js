import { test, expect } from "@playwright/test"

test("Create new user", async ({request}) => {
    const baseUrl = 'https://reqres.in';
    
    // use pw request to create new user '/api/users' with request data {name, job}
    const response = await request.post(baseUrl + '/api/users', {
        data: {
            "name": "Mohamed",
            "job": "Test Automation Engineer"
        }
    });
    // verify that response status is 201
    expect(response.status()).toBe(201);

    // extract json body from reponse then make sure the user returned with same name and job sent and also has an id value
    const responseBody = await response.json();
    expect(responseBody.name).toBe("Mohamed");
    expect(responseBody.job).toBe("Test Automation Engineer");
    expect(responseBody.id).toBeTruthy();

    // print the response body
    console.log(responseBody);
});

test("Update user using put", async ({request}) => {
    const baseUrl = 'https://reqres.in';
    
    // use pw request to update job value for user '/api/users/2' using put method
    const response = await request.put(baseUrl + '/api/users/2', {
        data: {
            "name": "Mohamed",
            "job": "Quality Engineer"
        }
    });
    // verify that response status is 200
    expect(response.status()).toBe(200);

    // extract json body from reponse then make sure the user returned with the same name but with updated job 
    const responseBody = await response.json();
    expect(responseBody.name).toBe("Mohamed");
    expect(responseBody.job).toBe("Quality Engineer");

    // print the response body
    console.log(responseBody);
});

test("Delete user", async ({request}) => {
    const baseUrl = 'https://reqres.in';
    
    // use pw request to delete user '/api/users/2'
    const response = await request.delete(baseUrl + '/api/users/2');
    // verify that response status is 204
    expect(response.status()).toBe(204);
});