<?php

namespace App\Security;

use App\Repository\ApiTokenRepository;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\AccessToken\AccessTokenHandlerInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;

class ApiTokenHandler implements AccessTokenHandlerInterface
{
    public function __construct(
        private ApiTokenRepository $apiTokenRepository
    ) {
    }

    public function getUserBadgeFrom(string $accessToken): UserBadge
    {
        $token = $this->apiTokenRepository->findOneBy(['token' => $accessToken]);

        if (null === $token) {
            throw new BadCredentialsException('Invalid credentials.');
        }

        // return the UserBadge with the user identifier (e.g. email)
        return new UserBadge($token->getOwner()->getUserIdentifier());
    }
}
