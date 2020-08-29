var components = [
  {
    name : "mssql",
    group: "Data stores (SQL)",
    image: "microsoft/mssql-server-linux",
    tags: ["latest"],
    ports: ["1433:1433"],
    environment: ["ACCEPT_EULA=Y", "MSSQL_PID=Express", "SA_PASSWORD=Password123!"],
    checked: true
  },

  {
    name : "postgres",
    group: "Data stores (SQL)",
    image: "postgres",
    tags: ["latest"],
    ports: ["5432:5432"],
    environment: ["POSTGRES_PASSWORD=Password123!"],
  },

  {
    name : "dotnet",
    group: "Dev/Build",
    image: "mcr.microsoft.com/dotnet/core/sdk",
    tags: ["latest"],
    //ports: ["8000:80"],
    volumes: [ "./src:/usr/src" ],
    stdin_open: true,
    tty: true,
    working_dir: "/usr/src"
  }

]

var app = new Vue({
    el: '#app',

    data: {
        message: 'Hello Vue!',
        components: components,
        dockercompose: "version: 3"
    },

    methods: {
        update: function() {
            lines = ["version: \"3\"", "services:"]
            for (var i=0; i<components.length; i++) {
                var component = components[i];
                if (!component.checked) continue;
                lines.push("\t" + component.name + ":")
                lines.push("\t\tcontainer_name: " + component.name)
                // TODO select version tag
                lines.push("\t\timage: " + component.image + ":" + component.tags[component.tags.length-1])
                lines.push("\t\tcontainer_name: " + component.name)
                if (component.ports) {
                    lines.push("\t\tports: ")
                    for (var j=0; j<component.ports.length;j++) {
                        lines.push("\t\t- " + component.ports[j])
                    }
                }
                if (component.environment) {
                    lines.push("\t\tenvironment: ")
                    for (var j=0; j<component.environment.length;j++) {
                        lines.push("\t\t- " + component.environment[j])
                    }
                }
                if (component.volumes) {
                    lines.push("\t\tvolumes: ")
                    for (var j=0; j<component.volumes.length;j++) {
                        lines.push("\t\t- " + component.volumes[j])
                    }
                }
                if (component.stdin_open) {
                    lines.push("\t\tstdin_open: " + component.stdin_open)
                }
                if (component.tty) {
                    lines.push("\t\ttty: " + component.tty)
                }
                if (component.working_dir) {
                    lines.push("\t\tworking_dir: " + component.working_dir)
                }

            }
            this.dockercompose = lines.join("\n")
        },
  }
})

app.update()






