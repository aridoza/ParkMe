import axios from 'axios';

const helpers = {
  getSpaces: function() {
    return axios.get('MONGODB_URI/spaces');
  }
}

export default helpers;
