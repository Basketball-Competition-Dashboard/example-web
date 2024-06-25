import Cookies from 'js-cookie'

export const hasSession = (): void => {
  Cookies.set('has_session', '1');
  return 
};

export const deleteSession = (): void => {
  Cookies.remove('has_session');
  return
}

export const isSession = (): boolean =>{
  return Cookies.get('has_session');
}