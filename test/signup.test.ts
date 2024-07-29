import { signup } from "../src/signup";

describe("signup", () => {
  it("should return -3 for invalid name", async () => {
    const input = {
      name: "",
      email: "test@example.com",
      cpf: "12345678901",
      carPlate: "ABC1234",
      isPassenger: true,
      isDriver: false,
    };

    const result = await signup(input);

    expect(result).toBe(-3);
  });

  it("should return -2 for invalid email", async () => {
    const input = {
      name: "John Doe",
      email: "invalidemail",
      cpf: "12345678901",
      carPlate: "ABC1234",
      isPassenger: true,
      isDriver: false,
    };

    const result = await signup(input);

    expect(result).toBe(-2);
  });

  it("should return -1 for invalid CPF", async () => {
    const input = {
      name: "John Doe",
      email: "test@example.com",
      cpf: "12345678900",
      carPlate: "ABC1234",
      isPassenger: true,
      isDriver: false,
    };

    const result = await signup(input);

    expect(result).toBe(-1);
  });

  it("should return -5 for invalid car plate when isDriver is true", async () => {
    const input = {
      name: "John Doe",
      email: "test@example.com",
      cpf: "12345678901",
      carPlate: "INVALID",
      isPassenger: false,
      isDriver: true,
    };

    const result = await signup(input);

    expect(result).toBe(-5);
  });

  it("should throw -4 for existing account", async () => {
    const input = {
      name: "John Doe",
      email: "existing@example.com",
      cpf: "12345678901",
      carPlate: "ABC1234",
      isPassenger: true,
      isDriver: false,
    };

    const result = signup(input);

    await expect(result).rejects.toEqual(-4);
  });

  it("should return the accountId for a new account", async () => {
    const input = {
      name: "John Doe",
      email: "new@example.com",
      cpf: "12345678901",
      carPlate: "ABC1234",
      isPassenger: true,
      isDriver: false,
    };

    const result = await signup(input);

    expect(result).toHaveProperty("accountId");
    expect(typeof result.accountId).toBe("number");
  });
});