var groups = 
    [
        {
            name: "Data stores (SQL)",
            components: 
                [
                  {
                    name : "mssql",
                    image: "microsoft/mssql-server-linux",
                    tags: ["latest"],
                    ports: ["1433:1433"],
                    environment: ["ACCEPT_EULA=Y", "MSSQL_PID=Express", "SA_PASSWORD=Password123!"],
                    checked: true
                  },

                  {
                    name : "postgres",
                    image: "postgres",
                    tags: ["latest"],
                    ports: ["5432:5432"],
                    environment: ["POSTGRES_PASSWORD=Password123!"],
                  }
                ]
        },
        {
            name: "Data stores (NoSQL)",
            components: 
                [
                  {
                    name : "mongo",
                    image: "mongo",
                    tags: ["latest"],
                    ports: ["27017:27017", "28017:28017"],
                    environment: ["MONGO_INITDB_ROOT_USERNAME=root", "MONGO_INITDB_ROOT_PASSWORD=Password123!"],
                  },

                  {
                    name : "elasticsearch",
                    image: "elasticsearch",
                    tags: ["7.9.0"],
                    ports: ["9200:9200", "9300:9300"],
                    environment: ["discovery.type=single-node"],
                  },

                ]
        },


        {
            name: "Development",
            components: 
                [
                    {
                        name : "dotnet",
                        image: "mcr.microsoft.com/dotnet/core/sdk",
                        tags: ["latest"],
                        //ports: ["8000:80"],
                        volumes: [ "./src:/usr/src" ],
                        stdin_open: true,
                        tty: true,
                        working_dir: "/usr/src"
                    },
                    {
                        name : "rust",
                        image: "rust",
                        tags: ["latest"],
                        //ports: ["8000:80"],
                        volumes: [ "./src:/usr/src" ],
                        stdin_open: true,
                        tty: true,
                        working_dir: "/usr/src"
                    }                ]
        }

    ]

var app = new Vue({
    el: '#app',

    data: {
        message: 'Hello Vue!',
        groups: groups,
        dockercompose: "version: 3"
    },

    methods: {
        update: function() {
            lines = ["version: \"3\"", "services:"]
            for (var i=0; i<groups.length; i++) {
                for (var k=0; k<groups[i].components.length; k++) {
                    var component = groups[i].components[k];
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
                
            }
            this.dockercompose = lines.join("\n")
        },
  }
})

app.update()






