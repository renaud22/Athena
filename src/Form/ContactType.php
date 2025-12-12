<?php

namespace App\Form;

use App\Entity\CommercialRelation;
use App\Entity\Contact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname', TextType::class, [
                'label' => 'Prénom',
                'attr' => ['placeholder' => ' ']
            ])
            ->add('lastname', TextType::class, [
                'label' => 'Nom',
                'attr' => ['placeholder' => ' ']
            ])
            ->add('jobTitle', TextType::class, [
                'label' => 'Poste / Fonction',
                'required' => false,
                'attr' => ['placeholder' => ' ']
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email',
                'required' => false,
                'attr' => ['placeholder' => ' ']
            ])
            ->add('phone', TextType::class, [
                'label' => 'Téléphone',
                'required' => false,
                'attr' => [
                    'placeholder' => ' ',
                ]
            ])
            ->add('linkedinUrl', UrlType::class, [
                'label' => 'Profil LinkedIn',
                'required' => false,
                'default_protocol' => 'https',
                'attr' => [
                    'placeholder' => ' ',
                    'pattern' => 'https?://.*',
                    'title' => 'L\'URL doit commencer par http:// ou https://'
                ],
            ])
            ->add('birthday', DateType::class, [
                'label' => 'Date de naissance',
                'required' => false,
                'widget' => 'single_text',
                'attr' => [
                    'data-controller' => 'datepicker',
                    'placeholder' => ' '
                ]
            ])
            ->add('personalAddress', TextType::class, [
                'label' => 'Adresse personnelle',
                'required' => false,
                'attr' => [
                    'data-controller' => 'address-autocomplete',
                    'placeholder' => ' '
                ]
            ])
            ->add('hobbies', TextareaType::class, [
                'label' => 'Hobbies / Intérêts',
                'required' => false,
                'attr' => ['rows' => 5, 'style' => 'min-height: 120px;', 'placeholder' => ' ']
            ])
            ->add('bio', TextareaType::class, [
                'label' => 'Note / Bio',
                'required' => false,
                'attr' => ['rows' => 5, 'style' => 'min-height: 120px;', 'placeholder' => ' ']
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Contact::class,
        ]);
    }
}
