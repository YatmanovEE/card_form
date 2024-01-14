import React from 'react';
import Close from 'src/assets/Close.svg';
import Check from 'src/assets/Check.svg';
import { v4 as uuidv4 } from 'uuid';
import Form from '../components/Form';
import Stepper from '../components/Stepper/Stepper';

export interface MethodPay {
  jsonrpc: string;
  id: string;
  result: Result;
}

export interface Result {
  pid: string;
}

export interface Check {
  status: 'process' | 'ok' | 'fail';
  pid: string;
}

const PayStepper: React.FC = () => {
  const [position, setPosition] = React.useState<'form' | 'loader' | 'valid' | 'error'>('form');
  const [pid, setPid] = React.useState('');

  React.useEffect(() => {
    if (position === 'loader' && pid) {
      const interval = setInterval(async () => {
        const response = await fetch(`http://localhost:2050/pay/check/${pid}`);
        const { status }: Check = await response.json();
        switch (status) {
          case 'process': {
            setPosition('loader');
            break;
          }
          case 'ok': {
            setPosition('valid');
            break;
          }
          case 'fail': {
            setPosition('error');
            break;
          }
          default: {
            setPosition('error');
            break;
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    return () => undefined;
  }, [pid, position]);

  if (position === 'loader') {
    return <Stepper title='Оплата...' />;
  }

  if (position === 'valid') {
    return (
      <Stepper title='Оплата прошла успешно'>
        <Check width={47} height={47} color='#08D60E' />
      </Stepper>
    );
  }
  if (position === 'error') {
    return (
      <Stepper title='Произошла ошибка'>
        <Close width={47} height={47} color='#F44336' />
      </Stepper>
    );
  }

  return (
    <Stepper title='Оплата банковской картой'>
      <Form
        onSubmit={(fieldState) => {
          const fieldStateEntries = fieldState[Symbol.iterator]();
          const postData = {
            jsonrpc: '2.0',
            id: uuidv4(),
            method: 'pay',
          };
          const params: Record<string, string> = {};
          while (1) {
            const { done, value } = fieldStateEntries.next();
            if (done) {
              break;
            }
            const [key, fieldStateValue] = value;
            params[key] = fieldStateValue.state;
          }
          fetch('http://localhost:2050/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ ...postData, params }),
          })
            .then((response) => response.json() as Promise<MethodPay>)
            .then(({ result: { pid } }) => {
              setPosition('loader');
              setPid(pid);
            })
            .catch(() => {
              setPosition('error');
            });
        }}
      />
    </Stepper>
  );
};

export default PayStepper;
