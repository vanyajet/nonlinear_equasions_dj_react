import ast
from rest_framework.views import APIView
from rest_framework.response import Response
# import numpy as np
from scipy.optimize import fsolve
from math import *


class TestAPIView(APIView):

    # def get(self, request, *args, **kwargs):
    #     data = [
    #         {'id': 1, 'iteration': ['x', 'y','z','f','q','T2','T1','T4','T5']},
    #         {'id': 2, 'iteration': ['495.564','198.444','87.548','58.651','871.588','293.41','279.41','84.41','123.41','258.41']},
    #         {'id': 3, 'iteration': ['495.564','198.444','87.548','58.651','871.588','293.41','279.41','84.41','123.41','258.41']},
    #         {'id': 4, 'iteration': ['495.564','198.444','87.548','58.651','871.588','293.41','279.41','84.41','123.41','258.41']},
    #         {'id': 5, 'iteration': ['495.564','198.444','87.548','58.651','871.588','293.41','279.41','84.41','123.41','258.41']},
    #         {'id': 6, 'iteration': ['495.564','198.444','87.548','58.651','871.588','293.41','279.41','84.41','123.41','258.41']},
    #     ]
    #     return Response(data)
    

    def post(self, request, *args, **kwargs):

        req = request.data['values']

        def init_equasions_list():

            initial_equasions_list = []
            for key, value in req.items():
                if key == 'variables':
                    continue
                elif key == 'initial_guess':
                    continue
                elif key == 'iterate_what':
                    continue
                elif key == 'iterate_from':
                    continue
                elif key == 'iterate_to':
                    continue
                elif key == 'iterate_step':
                    continue
                else:
                    initial_equasions_list.append(value)
            
            return initial_equasions_list

        variables_list = req['variables'].split(', ')
        initial_guess = req['initial_guess'].split(', ')
        initial_guess_list = []

        for y in initial_guess:
            yy = float(y)
            initial_guess_list.append(yy)

        iterate_what = req['iterate_what']
        
        iterate_from = int(req['iterate_from'])
        iterate_to = int(req['iterate_to'])
        iterate_step = int(req['iterate_step'])

        def f(vars):

            equasions_list = init_equasions_list()

            for i in range(len(variables_list)):
                locals()[variables_list[i]] = vars[i]

            for equasion in equasions_list: 
                eq = []
                for letter in equasion:
                    if len(equasion) == len(eq)+1:
                        if letter == iterate_what:
                            eq.append(iterable)
                        else:
                            eq.append(letter)
                        eq_joined = ''.join(eq)
                        equasions_list[equasions_list.index(equasion)] = eq_joined
                        break
                    elif letter == iterate_what:
                        eq.append(iterable)
                    
                    else:
                        eq.append(letter)

            solve = []

            for i in range(0, len(equasions_list), 1):
                solve.append(eval(equasions_list[i]))

            return solve

        data = [{'id': 0, 'iteration': variables_list, 'iterable': iterate_what}]

        for tau in range(iterate_from, iterate_to, iterate_step):

            iterable = str(tau)

            solution = fsolve(f, initial_guess_list)

            data.append({'id': tau, 'iteration': solution})

        return Response(data)
        
        # WORKS
        # Inner_values(variables='S1, S2, S3',
        # initial_guess='17.78, 0.56, 18',
        # equasion1='log(17.18) * S1 + sin(S2) + S3*q',
        # quasion2='cos(S2) * S1 - S3 + q',
        # equasion3='S1**2 + S2**3 + S3**q',
        # iterate_what='q',
        # iterate_from='1',
        # iterate_to='20',
        # iterate_step='5')
        
        # {'values': {'variables': '12313', 'initial_guess': '1231', 'equasion1': '12313', 'equasion2': '1231', 'iterate_what': '123', 'iterate_from': '123', 'iterate_to': '132132', 'iterate_step': '33'}}

        # [-0.40901418  0.11935968  0.2437145 ]
        # [-41.71072949 -42.39983674   6.48650634]
        # [-36.97000533  25.0045951    3.13043551]
        # [ -50.6491317  -384.58660378    3.0527074 ]