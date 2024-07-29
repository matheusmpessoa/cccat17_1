import { databaseConnection } from "../database/dbConnection";
import { signupRepository } from "../database/signupRepository";
import { validateCpf } from "../utils/old_validateCpf";
import { validateCarPlate } from "../utils/validateCarPlate";
import { validateName } from "../utils/validateName";
import { validateEmail } from "../utils/validateEmail";

export async function signup(input: any): Promise<any> {
  const { getConnection, finishConnection } = databaseConnection();
  const { getUserByEmail, insertUserIntoDatabase } = signupRepository({
    databaseConnection: getConnection(),
  });

  try {
    if (!validateCpf(input.cpf)) {
      throw new Error('Invalid cpf');
    }

    if (!validateEmail(input.email)) {
      throw new Error('Invalid email');
    }

    if (!validateName(input.name)) {
      throw new Error('Invalid name');
    }

    if (input.isDriver && !validateCarPlate(input.carPlate)) {
      throw new Error('Invalid car plate');
    }

    const account = await getUserByEmail(input.email);
    if (account) {
      throw new Error('Account already exists');
    }

    const newAccount = {
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      carPlate: input.carPlate,
      isPassenger: input.isPassenger,
      isDriver: input.isDriver,
    };
    const accountId = await insertUserIntoDatabase(newAccount);
    return { accountId };
  } catch (error) {
    finishConnection();
    throw error;
  }
}