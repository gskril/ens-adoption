import { Heading, mq } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 45ch;
  gap: 0.75rem;

  margin-right: auto;
  margin-left: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`

export const Title = styled(Heading).attrs(() => ({
  as: 'h1',
}))(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.headingTwo};

    ${mq.sm.min(css`
      font-size: ${theme.fontSizes.headingOne};
    `)}
  `
)
