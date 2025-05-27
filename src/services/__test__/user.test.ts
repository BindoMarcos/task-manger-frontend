import * as userService from '../user';
import api from '../api';

jest.mock('../api');

describe('user service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getUserMail(): debe llamar a api.get y devolver response.data', async () => {
    // @ts-ignore
    api.get.mockResolvedValue({ data: 'usuario@dominio.com' });

    const email = await userService.getUserMail();

    expect(api.get).toHaveBeenCalledWith('http://localhost:8080/api/usuario');
    expect(email).toBe('usuario@dominio.com');
  });
});
