
import sinon from 'sinon';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/index'; // Adjust the path as necessary
import * as service from '../src/components/api/auth/auth.service';  // Adjust the path as necessary
import { describe } from 'mocha'
describe('POST /register', () => {
  afterEach(() => {
    // Reset any mocks after each test
    sinon.restore();
  });

  it('should register a new user', async () => {
    // Mocked request body
    const requestBody = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      phone: '1234567890',
      address: '123 Test Street',
    };

    // Mocked response from createUser function
    const mockedUserId = 'mocked_user_id';
    const createUserStub = sinon.stub(service, 'createUser').resolves(mockedUserId);

    // Send request to the endpoint
    const res = await request(app)
      .post('/register')
      .send(requestBody);

    // Assert response
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('user_id', mockedUserId);
    expect(createUserStub.calledOnce).to.be.true;
    expect(createUserStub.args[0]).to.eql([
      requestBody.email,
      requestBody.password,
      requestBody.name,
      requestBody.phone,
      requestBody.address,
    ]);
  });
});




