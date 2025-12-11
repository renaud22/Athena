<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api')]
class TestController extends AbstractController
{
    #[Route('/me', name: 'api_me', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function me(): JsonResponse
    {
        return $this->json([
            'message' => 'Hello from API!',
            'user' => $this->getUser()->getUserIdentifier(),
            'roles' => $this->getUser()->getRoles(),
        ]);
    }
}
