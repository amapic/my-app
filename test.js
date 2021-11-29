const dfd = require("danfojs-node")

let data = {
    "Name": ["Apples", "Mango", "Banana", undefined],
    "Count": [NaN, 5, NaN, 10],
    "Price": [200, 300, 40, 250]
}

let df = new dfd.DataFrame(data)
df.print()

let values = ["Apples", df["Count"].mean()]
let df_filled = df.fillna(values, { columns: ["Name", "Count"] })
df_filled.print()