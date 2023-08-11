const configuration = require("../config.json");
const axios = require("axios");

class ApiController {
    prepareConfig(url, method) {
        return {
            method: method,
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${configuration.apiKey}`,
            }
        };
    }

    prepareConfigWithBody(url, method, body) {
        let config = this.prepareConfig(url, method);
        config.data = body;

        return config;
    }

    async getUserInfo() {
        try {
            let response = await axios(this.prepareConfig('https://api.freelancehunt.com/v2/my/profile', 'get'));
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProjects() {
        try {
            let response = await axios(this.prepareConfig('https://api.freelancehunt.com/v2/projects?filter[only_my_skills]=1', 'get'));

            return response.data.data.map(project => project.id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async applyForProject(projectId) {
        let body = JSON.stringify({
            "days": 1,
            "safe_type": "employer",
            "budget": {
                "amount": 500,
                "currency": "UAH"
            },
            "comment": configuration.description,
            "is_hidden": true
        });


        try {
            let response = await axios(this.prepareConfigWithBody(`https://api.freelancehunt.com/v2/projects/${projectId}/bids`, 'post', body));
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ApiController;