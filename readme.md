## Motivation

A set of utilities that revolve around SharePoint. 

## Installation

npm install uma-sp --save

## Usage

import * as uma from 'uma-sp';

### Email

#### Initialize the setup

You need to tell the library what is the SharePoint list name (a list that resides on the Root Web) that contains all your templates.

      uma.emailSetup({
        templatesListName: 'Workflow Email Templates'
      });
      
#### Get Template and Send Email
The signature is getTemplateAndSend(templateName, templateParams, from, to, subject)

      uma.email.getTemplateAndSend("Initiate", {Title: "TestEmail", Body: "Lorem Ipsum...."}, "system@tenant.onmicrosoft.com", "someone@tenant.onmicrosoft.com", "The subject of your email").then(result => {
          console.log("Email sent successfully: " + result);
      });

#### Send Email
The signature is send(from, to, body, subject)

      uma.email.send("system@tenant.onmicrosoft.com", "someone@tenant.onmicrosoft.com", "The content of the email...", "The subject of your email").then(result => {
          console.log("Email sent successfully: " + result);
      });

## API Reference

This package has dependencies on sp-pnp-js and lodash libraries