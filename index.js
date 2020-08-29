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
    volumes: "./src:/usr/src",
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
            lines = ["version: \"3\"", "services:", ""]
            for (var i=0; i<components.length; i++) {
                var component = components[i];
                if (!component.checked) continue;
                lines.push("\t" + component.name + ":")
            }
            this.dockercompose = lines.join("\n")
        },
  }
})

app.update()






