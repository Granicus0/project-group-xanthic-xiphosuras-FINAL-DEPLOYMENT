# <p align="center" > ArgusML - A simple, intuitive, online machine learning creation platform </p>
<p align="center"> 
  <img src="https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/a6e95a6c-9fa2-48dc-898b-9c9b552bbfac" width="400" height="400" >  
</p>

## Prerequisite Installations
This is a project that utilizes the [MERN](https://www.mongodb.com/mern-stack) stack. 

- [Node.js](https://nodejs.org/en)
  - Download the LTS version from the link above. Ensure you have Node.js before following any steps below.
- [Python](https://www.python.org/)
  - Download the latest version of Python from the link above. This will be needed for the back-end portion of the application.
  
## Install All Dependencies
To make things easy, two script files exist within the ``mern/`` directory to install *all* dependencies for the entire project scope, client, and server.
 
### Windows Platforms
If you are using Windows, you can execute the batch script named ``setup.bat`` in the ``mern/`` directory in the root of this repository. Simply double click the batch script and you should be good to go. If you already have Command Prmopt/Powershell open, or you don't have a desktop environment (for some reason ...), you can execute the batch script with the following command:

```
setup.bat
```

### Linux/macOS Platforms
If you are using Linux/macOS (Linux is also known as "Satya Nadella isn't siphoning your data, and Tim Cook doesn't have you locked down"), you can execute the batch script named ``setup.sh`` in the ``mern/`` directory in the root of this repository. To execute the script, use the following command in the ``mern/`` directory:

```
./setup.sh
```

If you get a permission denied error, you can simply run the following — which will prompt you for a password — and try again:

```
sudo chmod u+x setup.sh
```

## Running the project (development environment)
To run the project locally, you must navigate to both the ``client`` and ``server`` folders which are within the ``mern`` directory, and execute the following command in both locations:

```
npm run dev
```
For reference, this command has been manually configured in the ``package.json`` file in both the ``client`` and ``server`` folders to run the client and server with their "true" commands. In case you encounter any issues with this, you can instead use these "true" commands below:

#### For the server directory:
```
node --env-file=config.env ./api/index
```
#### For the client directory (same command):
```
npm run dev
```

## Building & Running the project (release environment)
If you want to instead build the project from scratch, you only need to build the front-end (or ``client`` folder), then start up the server normally. Below is how to do this:
#### First, change the environment variable ``VITE_ASSETS_FOLDER`` inside the file ``.env`` from ``src/assets`` to ``assets``
#### Then, build the client-side portion of the web app. This should produce a folder called ``dist`` inside the client folder. Run the following in the ``client`` folder:
```
npm run build
```
#### Then start up the server. Run the following in the ``server`` folder:
```
npm run dev
```
OR:
```
node --env-file=config.env ./api/index
```

You must then find a way to serve the ``index.html`` file which is one of the outputs of building the front-end, located in ``mern/client/dist``. A pretty standard way is to use Python's built in HTTP server. Run the following inside of ``mern/client/dist``:
```
python -m http.server 8000 # Try "python3" if "python" doesn't work, or a different port from 8000 if it's already in use
```
Navigate to the link the Python serve should show you and you should be able to use the website normally.

## Running tests

To run tests for the front-end (the project uses Vitest), simply use the following command in the ``client`` directory:
```
npm test
```

To run tests for the back-end (the project uses Jest), simply use the following command in the ``server`` directory:
```
npm test
```

## Project Feature Showcase via a Walkthrough

The project by and large is rather simple, it is a website where users can upload any training dataset and train their own machine learning models. You may think of it as a nice front-end for [scikit-learn](https://scikit-learn.org/), which is the back-end library used to train, test, and evaluate models.

To visit the site, click [here](https://project-group-xanthic-xiphosuras-deployment.vercel.app/)
You should be greeted by a lovely animation with the ability to log in, sign up, or view information about the application:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/8b0a5447-307e-4408-b5e0-5fafc3a29645)

Upon signing up/logging in, you'll be greeted with a dashboard containing all machine learning models you have currently trained. At the beginning, of course, it will be empty:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/230b3e82-6505-4dec-816c-7f606fbfa9af)

Users may create their own models by navigating via "Create New Model" button on the top right corner. Currently only three model types are supported: SVM (Support Vector Machine), NN (Neural Network), and RF (Random Forest). To make selection easy for the user, a short sentence is given beneath an interactive model animation (which depicts its structure) for what it performs best with.

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/3ef8471e-715d-4b92-afde-0dfa9ad7e7e5)
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/c73cfe7d-ebdf-43f3-b7c0-133dbe17174d)
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/eafbbcb3-aa5a-4588-b5bc-e891417351de)

Hinging on simplicity as per the project proposal, users need not learn about machine learning theory, rigorous statistics, or even any programming language. All they have to do is choose a model type, and upload a dataset. Currently, only CSV datasets are supported. Below will be a "flow chart" example of a user selecting to train a neural network, uploading a dataset, choosing a column for prediction, and obtaining the results:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/7b77620e-4410-4ce0-8416-d9d616dc2ba4)
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/ee2f200f-ed91-4e8a-9aa3-7dc028508962)
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/85e21a1e-8e2b-440b-a7eb-3bc8e36417cb)

Upon clicking "Start Training!", a graph is displayed which ***updates live*** showing the current progress of the model, as well as a training log and a training summary once finished. Note that at present, only neural networks support live graphs, due to the nature of extrapolating live graphable information from other the model types:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/c1a6ec69-5974-4358-834c-419a070d9152)

The user may then use the trained model immediately, or go back to the homepage (dashboard). If the user wants to use the model immediately, they'll be brought to a separate page with their model information and a means to upload a dataset to perform some predictions using the model:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/b3b2dea1-8920-47e1-a0bb-a977022e347b)
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/c2683162-8597-4100-82e4-20613fe6e844)

The user will then be greeted with an evaluation page and a CSV viewer to see the predictions their model made. They may also download the CSV for their own use. In the example below, we have the predicted incomes of various people:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/2e2a5e0e-4ce6-42fd-b51a-e66555ea1e72)

Back at the dashboard, the user can use their new model whenever they'd like, or delete it by pressing remove:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/35824b3e-af37-45a2-8486-7900a68f4f3a)


## Deployment:
The project is currently hosted on [Vercel](https://vercel.com) (for the front-end) and [Render](https://render.com) (for the back-end). 
The model training and prediction pages could take a while due to free-tier deployment, so please be patient.
Click [here](https://project-group-xanthic-xiphosuras-deployment.vercel.app/) to check out the deployment.




### Functionality Testing:

| Testing Unit | Testing Method |
|---|---|
| Front-end components | Vitest |
| Front-end context | Manual testing |
| Front-end hooks | Manual testing |
| Front-end pages | Manual testing |
| Back-end APIs | Jest |
| Python script | Manual testing |

