import * as pnp from 'sp-pnp-js';
import * as _ from 'lodash';
import * as jquery from 'jquery';
import { EmailConfig } from './email-config';

export class Email {

    public static getTemplateAndSend(templateName, templateParams, from, to, subject) {
        const inSharePoint = typeof _spPageContextInfo !== 'undefined';
        let pnpPromise = new Promise((resolve, reject) => {
            if (inSharePoint) {
                this.getEmailTemplate(templateName, templateParams).then(template => {
                    this.send(from, to, template, subject).then(result => {
                        resolve(result);
                    });
                }).catch(e => {
                    resolve(false);
                });
            }
            else {
                console.log(`Email sent to ${to}, using template ${templateName}`);
                resolve(false);
            }
        });
        return pnpPromise;
    }

    public static getEmailTemplate(name, params) {
        const inSharePoint = typeof _spPageContextInfo !== 'undefined';
        if (inSharePoint) {
            pnp.setup({
                headers:{
                    "Accept": "application/json; odata=verbose",
                },
            });

            let pnpPromise = new Promise((resolve, reject) => {
                let templatesListName = EmailConfig.getTemplatesListName();
                if(templatesListName != "") {
                    pnp.sp.site.rootWeb.lists.getByTitle(templatesListName).items.filter("Title eq '" + name + "'").get().then(results => {
                        let template = "";
                        if (results[0]) {
                            if (_spPageContextInfo.currentLanguage === 1036) {
                                template = results[0].TemplateFR;
                            }
                            else {
                                template = results[0].TemplateEN;
                            }
                        }
                        _.forEach(params, function (param, index) {
                            template = template.replace("@" + index + "@", param);
                        });
                        resolve(template);
                    });
                }
                else
                    resolve("Template List Not Set");
            });
            return pnpPromise;
        }
        else {
            let p = new Promise((resolve, reject) => {
                let template = "<h1>This is mock template</h1><p>@1@</p><p>@2@</p>";
                _.forEach(params, function (param, index) {
                    template = template.replace("@" + index + "@", param);
                });
                resolve(template);
            });
            return p;
        }
    }

    public static send(from, to, body, subject) {
        let p = new Promise((resolve, reject) => {
            // fetch(url, reqOptions).then(function(response){
            //     resolve(response.ok);
            // });
            const inSharePoint = typeof _spPageContextInfo !== 'undefined';
            if (inSharePoint) {
                jquery.ajax({
                    contentType: 'application/json',
                    url: _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail",
                    method: 'POST',
                    headers: {
                        'accept': 'application/json; odata=verbose',
                        'content-type': 'application/json; odata=verbose',
                        "X-RequestDigest": document.getElementById("__REQUESTDIGEST").getAttribute('Value')
                    },
                    data: JSON.stringify({
                        'properties': {
                            '__metadata': {'type': 'SP.Utilities.EmailProperties'},
                            'From': from,
                            'To': {'results': [to]},
                            'Body': body,
                            'Subject': subject
                        }
                    })
                }).done(function (response) {
                    resolve(true);
                }).fail(function (response) {
                    resolve(false);
                });
            }
            else {
                console.log(`Email sent to ${to}, body is ${body}`)
                resolve();
            }
        });
        return p;
    }
}