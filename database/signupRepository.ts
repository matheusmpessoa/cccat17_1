import crypto from 'crypto';

type Params = {
  databaseConnection: any;
};

type user = {
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
};

export function signupRepository({ databaseConnection }: Params) {
  return {
    async getUserByEmail(email: string) {
      const [acc] = await databaseConnection.query(
        'select * from cccat17.account where email = $1',
        [email]
      );
      return acc;
    },

    async insertUserIntoDatabase({
      email,
      name,
      carPlate,
      cpf,
      isDriver,
      isPassenger,
    }: user) {
      const id = crypto.randomUUID();
      await databaseConnection.query(
        'insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)',
        [id, name, email, cpf, carPlate, isPassenger, isDriver]
      );

      return id;
    },
  };
}