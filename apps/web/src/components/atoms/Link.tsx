import styled, { css } from 'styled-components'

interface LinkProps {
  to: string
}

export const Link = styled.a.attrs<{ to: string }>(({ to }) => ({
  href: to,
  rel: 'noopener',
  target: to.startsWith('/') ? '_self' : '_blank',
}))<LinkProps>`
  ${({ theme }) => css`
    color: ${theme.colors.blue};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `}
`
