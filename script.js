document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("fetch-data-button");
    const output = document.getElementById("output");

    button.addEventListener("click", () => {
        PromiseAPI1()
            .then((data1) => {
                displayData("Posts", data1);
                return PromiseAPI2();
            })
            .then((data2) => {
                displayData("Products", data2);
                return PromiseAPI3();
            })
            .then((data3) => {
                displayData("Todos", data3);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    });

    function PromiseAPI1() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch("https://dummyjson.com/posts")
                    .then(response => response.json())
                    .then(data => resolve(data.posts))
                    .catch(error => reject(error));
            }, 1000);
        });
    }

    function PromiseAPI2() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch("https://dummyjson.com/products")
                    .then(response => response.json())
                    .then(data => resolve(data.products))
                    .catch(error => reject(error));
            }, 2000);
        });
    }

    function PromiseAPI3() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch("https://dummyjson.com/todos")
                    .then(response => response.json())
                    .then(data => resolve(data.todos))
                    .catch(error => reject(error));
            }, 3000);
        });
    }

    function displayData(title, data) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headerRow = document.createElement("tr");
        const titleHeader = document.createElement("th");
        titleHeader.colSpan = 2;
        titleHeader.textContent = title;
        headerRow.appendChild(titleHeader);
        thead.appendChild(headerRow);

        data.forEach(item => {
            const row = document.createElement("tr");
            Object.values(item).slice(0, 2).forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        output.appendChild(table);
    }
});
