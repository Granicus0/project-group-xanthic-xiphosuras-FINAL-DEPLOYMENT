
const baseEndpoint = 'http://localhost:5050'
const secondaryEndpoint = '/api'


export const userEndpoints = {
  test: '/user/test',
  signup: baseEndpoint + secondaryEndpoint + '/user/signup',
  login: baseEndpoint + secondaryEndpoint + '/user/login',
};