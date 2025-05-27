import * as auth from '../auth';
import api from '../api';

jest.mock('../api');

describe('auth service', () => {
  const fakeToken = 'mi.token.de.prueba';

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('login(): debe llamar a api.post y guardar el token en sessionStorage', async () => {
    // @ts-ignore
    api.post.mockResolvedValue({ data: fakeToken });

    const result = await auth.login('a@b.com', 'secret');

    expect(api.post).toHaveBeenCalledWith(
      'http://localhost:8080/api/auth/login',
      { email: 'a@b.com', password: 'secret' }
    );
    expect(sessionStorage.getItem('token')).toBe(fakeToken);
    expect(result).toBe(fakeToken);
  });

  it('login(): si el token es vacío no guarda nada en sessionStorage', async () => {
    // @ts-ignore
    api.post.mockResolvedValue({ data: '' });

    const result = await auth.login('x@y.com', 'pwd');

    expect(sessionStorage.getItem('token')).toBeNull();
    expect(result).toBe('');
  });

  it('register(): debe llamar a api.post y devolver los datos', async () => {
    const fakeData = { id: 123, email: 'nuevo@user.com' };
    // @ts-ignore
    api.post.mockResolvedValue({ data: fakeData });

    const result = await auth.register('nuevo@user.com', 'abc123');

    expect(api.post).toHaveBeenCalledWith(
      'http://localhost:8080/api/auth/register',
      { email: 'nuevo@user.com', password: 'abc123' }
    );
    expect(result).toEqual(fakeData);
  });
});
