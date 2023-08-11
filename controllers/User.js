const ApiController = require("./ApiController");

class User {
    name;

    constructor(name) {
        this.name = name;
    }

    async checkForProjects() {
        let apiController = new ApiController();
        let projects = await apiController.getProjects();

        if (projects.length === 0) {
            console.log('No projects');
            return false;
        }

        return projects;
    }

    async applyForProject(projectId) {
        let apiController = new ApiController();
        console.log(`Applying for project ${projectId}`)
        let response = await apiController.applyForProject(projectId);

        if (response.status !== 200) {
            console.log(`Failed to apply for project ${projectId}`);
            return false;
        }

        console.log(`Applied for project ${projectId}`);
        return true;
    }
}

module.exports = User;