#!/usr/bin/env node
declare module "com.qcobjects.cli.commands.jira.client_services" {
    const Service: any;
    export class JiraCloud extends Service {
        static [x: string]: any;
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
    import { InheritClass } from "qcobjects";
    export class CommandHandler extends InheritClass {
        choiceOption: {
            [x: string]: any;
            issues: () => void;
        };
        constructor({ switchCommander }: {
            switchCommander: any;
        });
        getIssueList(): Promise<void>;
    }
}
declare module "com.qcobjects.cli.commands.version" {
    const InheritClass: any;
    export class CommandHandler extends InheritClass {
        static [x: string]: any;
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
    import "qcobjects";
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
        static [x: string]: any;
        install(): void;
        upgrade(switchCommander: any): void;
        installEnterprise(license: string | any[], email: any): void;
    }
}
declare module "org.quickcorp.qcobjects.api.client_services" {
    const Service: any;
    export class QuickCorpCloud extends Service {
        static [x: string]: any;
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
    /**
     * QCObjects CLI 2.4.x
     * ________________
     *
     * Author: Jean Machuca <correojean@gmail.com>
     *
     * Cross Browser Javascript Framework for MVC Patterns
     * QuickCorp/QCObjects is licensed under the
     * GNU Lesser General Public License v3.0
     * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
     *
     * Permissions of this copyleft license are conditioned on making available
     * complete source code of licensed works and modifications under the same
     * license or the GNU GPLv3. Copyright and license notices must be preserved.
     * Contributors provide an express grant of patent rights. However, a larger
     * work using the licensed work through interfaces provided by the licensed
     * work may be distributed under different terms and without source code for
     * the larger work.
     *
     * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
     *
     * Everyone is permitted to copy and distribute verbatim copies of this
     * license document, but changing it is not allowed.
    */
    export * as EnterpriseCommands from "org.qcobjects.enterprise.commands";
    import { InheritClass } from "qcobjects";
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
        program: any;
        constructor();
        shellCommands(_shell_commands: any[]): Promise<unknown>;
        fileListRecursive(dir: string): string | string[];
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
        static [x: string]: any;
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
        static [x: string]: any;
        pipe(o: any): string;
    }
}
declare module "org.quickcorp.qcobjects.main.http.gae.server" { }
declare module "org.quickcorp.qcobjects.main.http2.server" { }
declare module "qcobjects-createcert" { }
declare module "qcobjects-shell" { }
declare module "backend/com.qcobjects.backend.microservice.static" { }
