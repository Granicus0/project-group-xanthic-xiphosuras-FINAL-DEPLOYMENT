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

Upon signing up/logging in, you'll be greeted with a dashboard containing all machine learning models you have currently trained. At the beginning, of course, it will be empty (the user below, however, has one model already):

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/d294117f-786b-4eca-91db-6d5b022c8d0a)

Users may create their own models by navigating via "Create New Model" button on the top right corner. Currently only three model types are supported: SVM (Support Vector Machine), NN (Neural Network), and RF (Random Forest). To make selection easy for the user, a short sentence is given beneath an interactive model animation (which depicts its structure) for what it performs best with.

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/35ba4f3e-096d-44ee-95b2-9b09536bd48f)

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/00797640-0035-4d6e-a058-1f1692b8cee4)

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/de9264e1-bf31-4f96-98bc-8f467b0d799a)

Hinging on simplicity as per the project proposal, users need not learn about machine learning theory, rigorous statistics, or even any programming language. All they have to do is choose a model type, and upload a dataset. Currently, only CSV datasets are supported. Below will be a "flow chart" example of a user selecting to train a neural network, uploading a dataset, choosing a column for prediction, and obtaining the results:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/410f38d7-f952-47d8-bf3d-891ca6607de3)
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/2b1aade7-1fae-42bc-957f-c9b8250f9e0a)
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/85e21a1e-8e2b-440b-a7eb-3bc8e36417cb)

Upon clicking "Start Training!", a graph is displayed which ***updates live*** showing the current progress of the model, as well as a training log and a training summary once finished. Note that at present, only neural networks support live graphs, due to the nature of extrapolating live graphable information from other the model types:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/b23e0492-1910-466d-b191-0eef9ab536d4)

The user may then use the trained model immediately, or go back to the homepage (dashboard). If the user wants to use the model immediately, they'll be brought to a separate page with their model information and a means to upload a dataset to perform some predictions using the model:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/35bd68d0-6000-4cbf-867a-c56ff2670553)
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/c2683162-8597-4100-82e4-20613fe6e844)

The user will then be greeted with an evaluation page and a CSV viewer to see the predictions their model made. They may also download the CSV for their own use, and hover over the bar charts to see statistics about their data, and select which statistic they want to see by clicking any column header in the CSV viewer. In the example below, we have the predicted incomes of various people:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/e2bf2277-ee05-47a7-a459-a3c64bd551a2)

Back at the dashboard, the user can use their new model whenever they'd like, or delete it by pressing remove:

![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-xanthic-xiphosuras/assets/100744627/3a65d229-c12c-4306-b213-f5467bd020c8)


## Deployment:
The project is currently hosted on [Vercel](https://vercel.com) (for the front-end) and [Render](https://render.com) (for the back-end). 
The model training and prediction pages could take a while due to free-tier deployment, so please be patient.
Click [here](https://project-group-xanthic-xiphosuras-deployment.vercel.app/) to check out the deployment.




## Functionality Testing:

| Testing Unit | Testing Method |
|---|---|
| Front-end components | Vitest |
| Front-end context | Manual testing |
| Front-end hooks | Manual testing |
| Front-end pages | Manual testing |
| Back-end user APIs    | Jest and Manual testing w/ [Postman](https://www.postman.com/) |
| Back-end ML APIs | Jest and Manual testing |
| Python scripts | Manual testing |

### Detailed Testing Methods & Justifications

While testing user login and signup was rather trivial with Jest, and front-end components with Vitest, testing the rest of the back-end proved quite challenging given the three different model types outputting a plethora of data each with their own quirks, as well as the nearly infinite possible complexity of CSV datasets. Although it was definitely *possible* to automate the tests of the ML model training, testing, predicting, and schema generation, it would have required a testing facility of a similar scale to the project entirely, and so we decided to settle for manual testing. The model test procedures went as follows:

- We created a diverse set of test cases (not numerous; but diverse) covering the following:
  - **Typical Inputs**: Standard, expected CSV data that the models should process successfully
  - **Edge Cases**: CSV Data with unusual values, formats, or potential errors to test the model's robustness
  - **Boundary Conditions**: Data at the limits of what a model should handle (e.g., extremely large or small values)
  - **Environment**: We set up the necessary environment to run the models and any tools required for comparing results.
 
The above was to test the machine learning models performance in isolation. End-to-end testing was then done manually once it was confirmed the models were not outputting erroneous results themselves. The manual end-to-end testing procedure for the models were as follows:

- We made sure that there were ``console.log()`` statements at every "hop" in our application to catch any parts of the pipeline that were not being executed as expected in our backend API.
- We made sure that there were ``print()`` statements within the actual Python scripts to rule out any potential issues with Node.js child spawning and/or communication via ``stdout`` between Node.js and the Python child processes
- Create three model types using the *same* dataset to rule out any errors with actual data
- Train these three models using the *same* prediction label to rule out any problems with labels
- Compare the output of these models from our previous testing results from above
- Check ***all*** server logs on the actual deployment server to rule out any issues that could be local only

Depending on the specific problem at hand AND known/unknown factors, slight tweaks were made to the procedure above or the procedure would change entirely. For example, if it was found that the server deployment was working without issue, but hosting locally with, we would perform an inspection of all environment variables and configurations to spot the problem as this is likely the cause.
