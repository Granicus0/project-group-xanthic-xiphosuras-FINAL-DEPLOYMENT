const baseEndpoint = 'http://localhost:5050'
const secondaryEndpoint = '/api'


export const userEndpoints = {
  test: '/user/test',
  signup: baseEndpoint + secondaryEndpoint + '/user/signup',
  login: baseEndpoint + secondaryEndpoint + '/user/login',
};

export const aiModelEndpoints = {
  createModel: "/models/createModel",
  predictModel: "/models/predictModel",
  getUserModels: "/models/user/", // requires query parameter named 'id'
  getModelById: "/models/", // GET request requires query parameter named 'id'
  updateModelById: "/models/", // POST request, requires query parameter named 'id'
  deleteModelById: "/models/" // DELETE request, requires query parameter named 'id'
}