#!/usr/bin/env node
declare module "com.qcobjects.cli.commands.jira.client_services" { }
declare module "com.qcobjects.cli.commands.jira" { }
declare module "com.qcobjects.cli.commands" { }
declare module "com.qcobjects.cli.commands.version" { }
declare module "qcobjects-cli" {
    const InheritClass: any;
    class Main extends InheritClass {
        constructor();
    }
    const __main__: Main;
    export default __main__;
}
declare module "index" {
    import * as cli from "qcobjects-cli";
    export default cli;
}
declare module "org.qcobjects.common.pipelog" { }
declare module "org.qcobjects.enterprise.commands" { }
declare module "org.quickcorp.qcobjects.api.client_services" { }
declare module "org.quickcorp.qcobjects.cli" { }
declare module "org.quickcorp.qcobjects.collab.server" { }
declare module "org.quickcorp.qcobjects.defaultsettings" { }
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
