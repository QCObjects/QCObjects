#!/usr/bin/env node
declare module "api-client_services" {
    import { Service } from "qcobjects";
    export class QuickCorpCloud extends Service {
        headers: any;
        url: any;
        basePath: any;
        data: any;
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
declare module "client_services" {
    import { Service } from "qcobjects";
    export class JiraCloud extends Service {
        domain: string;
        basePath: string;
        username_password: string;
        username: any;
        password: any;
        headers: any;
        url: any;
        apiMethod: any;
        data: any;
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
declare module "cli-commands-jira" {
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
declare module "cli-commands-publish-static" {
    import { InheritClass } from "qcobjects";
    export class CommandHandler extends InheritClass {
        choiceOption: {
            [x: string]: any;
            publish_static: (source: string, dest: string, options: any) => void;
        };
        constructor({ switchCommander }: {
            switchCommander: any;
        });
    }
}
declare module "enterprise-commands" {
    import { InheritClass } from "qcobjects";
    export class QCObjectsEnterprise extends InheritClass {
        install(): void;
        static upgrade(switchCommander: any): Promise<void>;
        installEnterprise(license: string, email: string): void;
    }
}
declare module "cli-commands" {
    export * as versionCommand from "cli-commands-version";
    export * as jiraCommand from "cli-commands-jira";
    export * as publishStatic from "cli-commands-publish-static";
}
declare module "defaultsettings" {
    import "qcobjects";
    export const __get_version__: () => {
        qcobjects: any;
        sdk: any;
        cli: any;
    };
    export const __get_version_string__: () => string;
}
declare module "cli-main" {
    import "qcobjects";
    export * as EnterpriseCommands from "enterprise-commands";
    import { InheritClass } from "qcobjects";
    export * as QuickCorpServices from "api-client_services";
    export * as customCommands from "cli-commands";
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
declare module "cli-commands-version" {
    import { InheritClass } from "qcobjects";
    import { SwitchCommander } from "cli-main";
    export class CommandHandler extends InheritClass {
        choiceOption: {
            getVersionStringFromFile(filename: string): string;
            parseVersionSuffix(versionString: any): string;
            parseVersionString(versionString: any): string;
            buildNewVersionString(arg0: {
                major: number;
                minor: number;
                patch: number;
            }, versionSuffix: any): string;
            saveNewVersionFile(filename: string, newVersion: any): string;
            syncGit(newVersion: any, commitMsg: any, syncNpm: any): string;
            switchCommander: any;
            v_major(filename: string, options: any): void;
            v_minor(filename: string, options: any): void;
            v_patch(filename: string, options: any): void;
            v_sync(filename: string, options: any): void;
            v_changelog(): void;
        };
        switchCommander: SwitchCommander;
        constructor({ switchCommander }: {
            switchCommander: SwitchCommander;
        });
        syncGit(versionString: any, commitMsg: any, syncNpm?: boolean): void;
        parseVersionString(versionString: string): {
            major: string;
            minor: string;
            patch: string;
        };
        getVersionStringFromFile(filename: any): string;
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
declare module "collab-server" {
    /**
     * QCObjects CLI 2.5
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
    import { InheritClass } from "qcobjects";
    export class CollabServer extends InheritClass {
        protected_symbols: string[];
        replServer: any;
        commands: {
            loadcmd_json: {
                help: string;
                action(args: string): void;
            };
            loadcmd_str: {
                help: string;
                action(args: string): void;
            };
            save_json: {
                help: string;
                action(args: string): void;
            };
            load_json: {
                help: string;
                action(args: string): void;
            };
            cmd: {
                help: string;
                action(...args: string[]): void;
            };
        };
        constructor();
        runScript(context: any): void;
        start(): void;
    }
}
declare module "common-pipelog" {
    import { InheritClass } from "qcobjects";
    export class PipeLog extends InheritClass {
        static pipe(o: any): string;
    }
}
declare module "qcobjects-cli" {
    import { InheritClass } from "qcobjects";
    export * as defaultSettings from "defaultsettings";
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
declare module "main-file" {
    import { InheritClass } from "qcobjects";
    export class FileDispatcher extends InheritClass {
        scriptname: any;
        filename: any;
        pathname: string;
        headers: any;
        templateURI: string;
        template: any;
        body: any;
        constructor({ name, template, templateURI, headers, body, filename, done }: {
            name: string;
            template: string;
            templateURI: string;
            headers: any;
            body: string;
            filename: string;
            done: (headers: any, body: any, templateURI?: string, isTemplate?: boolean) => any;
        });
        file_extension(): any;
        isTemplate(): any;
        _done(): void;
        done(headers: any, body: any, templateURI?: string, isTemplate?: boolean): void;
    }
}
declare module "main-http-gae-server" {
    import { InheritClass } from "qcobjects";
    export class HTTPServer extends InheritClass {
        interceptorInstances: any[];
        server: any;
        request: any;
        response: any;
        constructor({ request, response, server, scriptname, interceptorInstances }: {
            request: any;
            response: any;
            server?: any;
            scriptname: string;
            interceptorInstances: any[];
        });
        showIPAddress(): string;
        showPossibleURL(): string;
        start(): void;
    }
}
declare module "main-http-server" {
    import { InheritClass } from "qcobjects";
    export class HTTPServer extends InheritClass {
        interceptorInstances: never[];
        server: any;
        request: any;
        response: any;
        constructor({ request, response, server, scriptname, interceptorInstances }: {
            request?: null | undefined;
            response?: string | undefined;
            server?: null | undefined;
            scriptname?: string | undefined;
            interceptorInstances?: never[] | undefined;
        });
        showIPAddress(): string;
        showPossibleURL(): string;
        start(): void;
    }
}
declare module "main-http2-server" {
    import { InheritClass } from "qcobjects";
    import http2 from "node:http2";
    export class HTTP2Server extends InheritClass {
        server: http2.Http2SecureServer<typeof import("http").IncomingMessage, typeof import("http").ServerResponse, typeof http2.Http2ServerRequest, typeof http2.Http2ServerResponse>;
        interceptorInstances: any;
        request: any;
        response: any;
        constructor({ request, response, server, scriptname, interceptorInstances }: {
            request: any;
            response: any;
            server?: any;
            scriptname: string;
            interceptorInstances: any[];
        });
        showIPAddress(): string;
        showPossibleURL(): string;
        start(): void;
    }
}
declare module "qcobjects-collab" {
    import "defaultsettings";
}
declare module "qcobjects-createcert" {
    import "defaultsettings";
}
declare module "qcobjects-gae-http-server" {
    import "defaultsettings";
}
declare module "qcobjects-http-server" {
    import "defaultsettings";
}
declare module "qcobjects-http2-server" {
    /**
     * QCObjects CLI 2.5
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
    import "defaultsettings";
}
declare module "qcobjects-shell" {
    import "defaultsettings";
}
declare module "backend/backend-microservice-static" { }
declare module "backend/backend-php" { }
//# sourceMappingURL=index.d.ts.map