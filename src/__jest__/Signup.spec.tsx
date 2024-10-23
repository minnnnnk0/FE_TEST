import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SignupPage from '../pages/SignupPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {},
});

describe('회원가입 테스트', () => {
  // 중복되는 부분은 하나로 처리
  // 각 test가 돌아가기 전마다 실행
  beforeEach(() => {
    // given - 회원가입 페이지가 랜더링
    const routes = [
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/signup'],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  });

  test('비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러 메세지가 표시된다.', async () => {
    // when - 비밀번호와 비밀번호 확인 값이 일치하지 않음
    const passwordInput = screen.getByLabelText('비밀번호');
    const confirmPasswordInput = screen.getByLabelText('비밀번호 확인');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'WrongPassword' },
    });

    // then - 에러 메세지가 표시
    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
  });

  test('이메일을 입력하고, 비빌번호와 비밀번호 확인 값이 일치하면 회원가입 버튼이 활성화된다.', () => {
    // 회원가입 버튼이 비활성화 되어있는 것을 확인하고 시작하면 좋음
    const signupButton = screen.getByRole('button', { name: '회원가입' });
    expect(signupButton).toBeDisabled();

    // when - 이메일 입력, 비밀번호, 비밀번호 확인 일치
    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const confirmPasswordInput = screen.getByLabelText('비밀번호 확인');

    fireEvent.change(emailInput, {
      target: { value: 'button-activate@email.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password' },
    });

    // then - 회원가입 버튼 활성화
    expect(signupButton).toBeEnabled();
    
  });
});
