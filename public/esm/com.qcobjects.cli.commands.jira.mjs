var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/com.qcobjects.cli.commands.jira.client_services.ts
var { Package, Service, logger } = __require("qcobjects");
var JiraCloud = class extends Service {
  static {
    __name(this, "JiraCloud");
  }
  constructor({
    name = "jira_cloud",
    external = true,
    useHTTP2 = true,
    cached = false,
    method = "POST",
    headers = {
      "accept": "application/json",
      "content-type": "application/json"
    },
    basePath = "",
    url = "",
    withCredentials = false
  }) {
    super({
      name,
      external,
      useHTTP2,
      cached,
      method,
      headers,
      basePath,
      url,
      withCredentials
    });
    var o = this;
    this.domain = `${o.domain}`;
    this.basePath = `https://${this.domain}/`;
    this.username_password = `${o.username}:${o.password}`;
    this.headers["authorization"] = `Basic ${Buffer.from(this.username_password).toString("base64")}`;
    this.url = this.basePath + o.apiMethod;
    this.data = o.data;
  }
  done(service, standardResponse) {
    logger.debug(standardResponse);
  }
  fail(e) {
    logger.debug(e);
  }
};
Package("com.qcobjects.cli.commands.jira.client_services", [
  JiraCloud
]);

// src/com.qcobjects.cli.commands.jira.ts
var path = __require("path");
var absolutePath = path.resolve(__dirname, "./");
var {
  exec,
  execSync
} = __require("child_process");
var { Package: Package2, InheritClass, _DataStringify, New, CONFIG, logger: logger2, serviceLoader } = __require("qcobjects");
var CommandHandler = class extends InheritClass {
  static {
    __name(this, "CommandHandler");
  }
  constructor({
    switchCommander
  }) {
    super({ switchCommander });
    this.choiceOption = {
      issues: /* @__PURE__ */ __name(function() {
        this.getIssueList().then(function(response) {
          console.log(_DataStringify(response));
        }).catch((e) => {
          console.log(e);
          process.exit(1);
        });
      }, "issues")
    };
    const commandHandler = this;
    switchCommander.program.command("jira <subcommand>").option("-u, --from-user [username]", "User name").option("-fp,--from-project <projectName>", "Project name").option("-p, --pwd <password>", "Password").option("-f, --format <format>", "Format (json, table)").description(`Jira Integration:
                            Sub-Commands can be:
                                issues: To get the issues list from JIRA
        `).action(function(subcommand, options) {
      if (commandHandler.choiceOption.hasOwnProperty.call(commandHandler.choiceOption, subcommand)) {
        commandHandler.choiceOption[subcommand].call(commandHandler, subcommand, options);
      } else {
        console.error(`Sub-Command (jira ${subcommand}... ) is not available`);
        process.exit(1);
      }
    });
  }
  getIssueList() {
    return new Promise(function(resolve, reject) {
      logger2.info("I'm going to get the issue list from the jira cloud...");
      const jira_config = CONFIG.get("jira", null);
      if (jira_config !== null) {
        const jira_username = jira_config.username;
        const jira_password = jira_config.auth_token;
        const jira_project = jira_config.project;
        const jira_domain = jira_config.domain;
        const jira_issue_fields = ["id", "key", "summary", "timetracking"];
        const cloudClient = New(JiraCloud, {
          domain: `${jira_domain}`,
          username: `${jira_username}`,
          password: `${jira_password}`,
          apiMethod: "rest/api/latest/search",
          data: {
            "jql": `project = ${jira_project}`,
            "startAt": 0,
            "maxResults": 5e3,
            "fields": jira_issue_fields
          }
        });
        try {
        } catch (e) {
          console.error("\u{1F926} Something went wrong \u{1F926} when trying to get jira issues from the cloud");
          reject(e);
        }
      } else {
        console.error("\u{1F926} Something went wrong \u{1F926} You need to set the jira config settings");
        reject(new Error("\u{1F926} Something went wrong \u{1F926} You need to set the jira config settings"));
      }
    });
  }
};
Package2("com.qcobjects.cli.commands.jira", [
  CommandHandler
]);
export {
  CommandHandler
};
//# sourceMappingURL=com.qcobjects.cli.commands.jira.mjs.map
