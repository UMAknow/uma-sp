export interface IEmailConfiguration {
    templatesListName?: string;

}

export class EmailConfiguration {
    private _templatesListName: string;

    constructor() {
        this._templatesListName = "";
    }

    public set(config: IEmailConfiguration) {
        if(config.hasOwnProperty("templatesListName")) {
            this._templatesListName = config.templatesListName;
        }
    }

    public getTemplatesListName() {
        return this._templatesListName;
    }

}

const _emailConfig = new EmailConfiguration();

export let EmailConfig = _emailConfig;

export function setEmailConfig(config: IEmailConfiguration): void {
    _emailConfig.set(config);
}

export function getTemplatesListName(): IEmailConfiguration {
    return _emailConfig.getTemplatesListName();
}