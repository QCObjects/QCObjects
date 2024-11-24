#!/usr/bin/env node
declare module "com.qcobjects.cli.commands.jira.client_services" {
    const Service: any;
    export class JiraCloud extends Service {
        constructor({ name, external, useHTTP2, cached, method, headers, basePath, url, withCredentials }: {
            name?: string | undefined;
            external?: boolean | undefined;
            useHTTP2?: boolean | undefined;
            cached?: boolean | undefined;
            method?: string | undefined;
            headers?: {
                accept: string;
                "content-type": string;
            } | undefined;
            basePath?: string | undefined;
            url?: string | undefined;
            withCredentials?: boolean | undefined;
        });
        done(service: any, standardResponse: any): void;
        fail(e: any): void;
    }
}
declare module "com.qcobjects.cli.commands.jira" {
    const InheritClass: any;
    export class CommandHandler extends InheritClass {
        constructor({ switchCommander }: {
            switchCommander: any;
        });
        getIssueList(): Promise<void>;
    }
}
declare module "com.qcobjects.cli.commands.version" {
    const InheritClass: any;
    export class CommandHandler extends InheritClass {
        constructor({ switchCommander }: {
            switchCommander: any;
        });
        syncGit(versionString: any, commitMsg: any, syncNpm?: boolean): void;
        parseVersionString(versionString: string): {
            major: string;
            minor: string;
            patch: string;
        };
        getVersionStringFromFile(filename: any): any;
        buildNewSemVersionString({ major, minor, patch }: {
            major: string;
            minor: string;
            patch: string;
        }): string;
        parseVersionSuffix(versionString: string): string;
        buildNewVersionString({ major, minor, patch }: any, suffix: any): string;
        saveNewVersionFile(filename: any, versionString: any): void;
    }
}
declare module "com.qcobjects.cli.commands" {
    export * as versionCommand from "com.qcobjects.cli.commands.version";
    export * as jiraCommand from "com.qcobjects.cli.commands.jira";
}
declare module "org.quickcorp.qcobjects.defaultsettings" {
    export const __get_version__: () => {
        qcobjects: any;
        sdk: any;
        cli: any;
    };
    export const __get_version_string__: () => string;
}
declare module "org.qcobjects.enterprise.commands" {
    const InheritClass: any;
    export class QCObjectsEnterprise extends InheritClass {
        install(): void;
        upgrade(switchCommander: any): void;
        installEnterprise(license: string | any[], email: any): void;
    }
}
declare module "org.quickcorp.qcobjects.api.client_services" {
    const Service: any;
    export class QuickCorpCloud extends Service {
        constructor({ name, external, useHTTP2, cached, method, headers, basePath, url, withCredentials }: {
            name?: string | undefined;
            external?: boolean | undefined;
            useHTTP2?: boolean | undefined;
            cached?: boolean | undefined;
            method?: string | undefined;
            headers?: {
                origin: string;
                "content-type": string;
            } | undefined;
            basePath?: string | undefined;
            url?: string | undefined;
            withCredentials?: boolean | undefined;
        });
        _new_(o: any): void;
        done(service: any, standardResponse: any): void;
        fail(e: any): void;
    }
}
declare module "org.quickcorp.qcobjects.cli" {
    const InheritClass: any;
    export * as EnterpriseCommands from "org.qcobjects.enterprise.commands";
    export * as QuickCorpServices from "org.quickcorp.qcobjects.api.client_services";
    export * as customCommands from "com.qcobjects.cli.commands";
    export const getPluginCommandsList: () => any;
    export class SwitchCommander extends InheritClass {
        choiceOption: {
            generateSw: (_appName: boolean, options: {
                dir: any;
            }) => void;
            create: (_appName: boolean, options: {
                createAmp: any;
                createPwa: any;
                createPhp: any;
                createCustom: any;
            }) => void;
            publish(_appName: any, _options: any): void;
            upgradeToEnterprise(_appName: any, _options: any): void;
        };
        constructor();
        shellCommands(_shell_commands: any[]): Promise<unknown>;
        fileListRecursive(dir: string): string | any[];
        register(email: any, phonenumber: any): Promise<unknown>;
        generateServiceWorker(appName: any, dirPrefix?: string): Promise<unknown>;
        copyTemplate(source: any, dest: any): Promise<void>;
        initCommand(): void;
    }
}
declare module "qcobjects-cli" {
    const InheritClass: any;
    export * as defaultSettings from "org.quickcorp.qcobjects.defaultsettings";
    export class Main extends InheritClass {
        constructor();
    }
    const __main__: Main;
    export default __main__;
}
declare module "index" {
    import * as cli from "qcobjects-cli";
    export default cli;
}
declare module "org.qcobjects.common.pipelog" {
    const InheritClass: any;
    export class PipeLog extends InheritClass {
        pipe(o: any): string;
    }
}
declare module "org.quickcorp.qcobjects.collab.server" { }
declare module "org.quickcorp.qcobjects.main.file" { }
declare module "org.quickcorp.qcobjects.main.http.gae.server" { }
declare module "org.quickcorp.qcobjects.main.http.server" { }
declare module "org.quickcorp.qcobjects.main.http2.server" { }
declare module "qcobjects-collab" { }
declare module "qcobjects-createcert" { }
declare module "qcobjects-gae-http-server" { }
declare module "qcobjects-http-server" { }
declare module "qcobjects-http2-server" { }
declare module "qcobjects-shell" { }
declare module "backend/com.qcobjects.backend.microservice.static" { }
declare module "backend/org.qcobjects.backend.php" { }
