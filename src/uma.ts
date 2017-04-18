import { Email } from './email/email-utils';
import { setEmailConfig, IEmailConfiguration } from './email/email-config';

export const emailSetup: (config: IEmailConfiguration) => void = setEmailConfig;

export const email = Email;

const Def = {
    /**
     * Provides access to the Email utilities
     */
    email: email,
    /**
     * Provides access to the Email utilities
     */
    emailSetup: emailSetup
};

export default Def;