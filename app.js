const ApiController = require('./controllers/ApiController');
const User = require('./controllers/User');

async function main() {
    let apiController = new ApiController();
    let user_info = await apiController.getUserInfo();

    let user = new User(
        `${user_info.attributes.first_name} ${user_info.attributes.last_name}`);

    console.log(`Starting bot for ${user.name}`);

    while (true) {
        let projects = await user.checkForProjects();

        if (projects) {
            console.log('Found projects');

            for (const projectKey in projects) {
                await user.applyForProject(projects[projectKey]);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 10000));
    }
}


main()
    .then(r => console.log('Done'))
    .catch(e => console.log(e));
