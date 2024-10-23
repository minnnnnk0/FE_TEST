import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SignupPage from '../pages/SignupPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {},
});

describe('회원가입 테스트', () => {
  test('비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러 메세지가 표시된다.', async () => {
    
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

    // when - 비밀번호와 비밀번호 확인 값이 일치하지 않음
    const passwordInput = screen.getByLabelText("비밀번호")
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인")

    fireEvent.change(passwordInput, {target: {value: "password"}})
    fireEvent.change(confirmPasswordInput, {
        target: {value: "WrongPassword"}
    })

    // then - 에러 메세지가 표시
    const errorMessage = await screen.findByTestId("error-message")
    expect(errorMessage).toBeInTheDocument()

  });
});
