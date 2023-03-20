import { Heading, mq } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

import { APIResponse } from '../../types'
import { CrossIcon, GithubIcon, LinkIcon, TwitterIcon } from '../icons'
import { Link } from '../atoms'
import { sanitizeUrl, truncateAddress } from '../../utils'

type ModalProps = {
  onDismiss: () => void
  open: boolean
  space: APIResponse | null
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(0.375rem);
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 1;
    padding: 1.25rem;
    width: 100%;
    max-width: 24rem;
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 1rem;
    background-color: #fff;
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    opacity: 0.6;
    transition: opacity 0.15s ease-in-out;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`

const Title = styled(Heading)`
  line-height: 1;

  ${mq.sm.max(css`
    font-size: 1.625rem;
  `)}

  ${mq.xs.max(css`
    font-size: 1.3125rem;
  `)}
`

const Profiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .left {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
      object-fit: cover;
      border-radius: 50%;
      box-shadow: var(--avatar-shadow);
    }
  }

  .right {
    display: flex;
    gap: 0.5rem;

    a {
      transition: opacity 0.15s ease-in-out;

      &:hover {
        opacity: 0.7;
      }
    }

    ${mq.xs.max(css`
      gap: 0.25rem;
    `)}
  }
`

export function Modal({ onDismiss, open, space }: ModalProps) {
  if (!open || !space) return null

  return (
    <>
      <Wrapper>
        <div className="background" onClick={onDismiss} />
        <div className="content">
          <button className="close" onClick={onDismiss}>
            <CrossIcon />
          </button>

          <Title>{space.space}</Title>

          <Profiles>
            {space.profiles.map((profile) => (
              <Profile key={profile.address}>
                <div className="left">
                  <img
                    src={profile.textRecords.avatar || '/av-default.png'}
                    loading="lazy"
                    width={36}
                    height={36}
                    onError={(e) => {
                      // Sometimes avatars are set to 404s
                      e.currentTarget.src = '/av-default.png'
                    }}
                  />
                  <span>
                    {profile.name || truncateAddress(profile.address)}
                  </span>
                </div>

                <div className="right">
                  {profile.textRecords['url'] && (
                    <Link to={sanitizeUrl(profile.textRecords['url'])}>
                      <LinkIcon />
                    </Link>
                  )}

                  {profile.textRecords['com.github'] && (
                    <Link
                      to={`https://github.com/${profile.textRecords['com.github']}`}
                    >
                      <GithubIcon />
                    </Link>
                  )}

                  {profile.textRecords['com.twitter'] && (
                    <Link
                      to={`https://twitter.com/${profile.textRecords['com.twitter']}`}
                    >
                      <TwitterIcon />
                    </Link>
                  )}
                </div>
              </Profile>
            ))}
          </Profiles>
        </div>
      </Wrapper>
    </>
  )
}
