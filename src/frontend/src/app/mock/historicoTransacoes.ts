interface transacao {
    quantidade: number,
    preco: number,
    sku: string,
    timeStamp: string,
    carteira1: string,
    carteira2: string,
}

export const transacoes: transacao[] = [
    {
        quantidade: 200,
        preco: 30000,
        sku: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
        timeStamp: "20/02/2023",
        carteira1: "0x7e0900Af7f6C13BeEc8Be6Bc5C206A8D3349735C",
        carteira2: "0xb3F64590A5f23ceB5250A482D3bf123c0720F562"
    },
    {
        quantidade: 150,
        preco: 280.00,
        sku: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd865",
        timeStamp: "22/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 100,
        preco: 320.00,
        sku: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd865",
        timeStamp: "25/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 100,
        preco: 320.00,
        sku: "0x114bd151f8fb0c58642d2170da4ae7d7c57977260ac2cc8905306cab6b2acabc",
        timeStamp: "25/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 100,
        preco: 50.00,
        sku: "0x35a8c70834b348d8bca4df6f9d6f6ab4491bc534a5ef5e4b9bf1ab48e404f977",
        timeStamp: "20/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 80,
        preco: 45.00,
        sku: "0x35a8c70834b348d8bca4df6f9d6f6ab4491bc534a5ef5e4b9bf1ab48e404f977",
        timeStamp: "22/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 120,
        preco: 55.00,
        sku: "0x35a8c70834b348d8bca4df6f9d6f6ab4491bc534a5ef5e4b9bf1ab48e404f977",
        timeStamp: "25/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 300,
        preco: 10.00,
        sku: "0x1d852a35f1c74ad5aef866b0a20bf9562a8b9a37d6eef70bf76c2de1f52a9f80",
        timeStamp: "20/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 250,
        preco: 12.00,
        sku: "0x1d852a35f1c74ad5aef866b0a20bf9562a8b9a37d6eef70bf76c2de1f52a9f80",
        timeStamp: "22/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 350,
        preco: 8.00,
        sku: "0x1d852a35f1c74ad5aef866b0a20bf9562a8b9a37d6eef70bf76c2de1f52a9f80",
        timeStamp: "25/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 50,
        preco: 5.00,
        sku: "0x7f414d3e9a2e4d0cb35a1a76f1a6f70c3a7d5a498e8d46a491c8fb97d77ed3ae",
        timeStamp: "20/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 70,
        preco: 4.50,
        sku: "0x7f414d3e9a2e4d0cb35a1a76f1a6f70c3a7d5a498e8d46a491c8fb97d77ed3ae",
        timeStamp: "22/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 60,
        preco: 5.50,
        sku: "0x7f414d3e9a2e4d0cb35a1a76f1a6f70c3a7d5a498e8d46a491c8fb97d77ed3ae",
        timeStamp: "25/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 20,
        preco: 200.00,
        sku: "0x413fd2f587ba4d9c8a1c32aef14ed675d58a3f8ed7314f409f1b72fcb9c9a0b9",
        timeStamp: "20/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 15,
        preco: 210.00,
        sku: "0x413fd2f587ba4d9c8a1c32aef14ed675d58a3f8ed7314f409f1b72fcb9c9a0b9",
        timeStamp: "22/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    },
    {
        quantidade: 25,
        preco: 190.00,
        sku: "0x413fd2f587ba4d9c8a1c32aef14ed675d58a3f8ed7314f409f1b72fcb9c9a0b9",
        timeStamp: "25/02/2023",
        carteira1: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899",
        carteira2: "0x4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd899"
    }
]